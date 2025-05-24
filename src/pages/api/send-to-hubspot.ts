import type { APIRoute } from "astro";

export const prerender = false;

const HUBSPOT_PORTAL_ID = "441758828";
const HUBSPOT_FORM_GUID = "116784e0-b669-4921-a65f-81f19c0467c2";
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;





export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  

  // Validaciones
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPhone = (phone: string) =>
      phone === "" || /^[0-9\s\-\+()]{7,15}$/.test(phone);

    if (!isValidPhone(body.telefono)) {
      return new Response(
        JSON.stringify({ success: false, error: "Teléfono inválido" }),
        { status: 400 }
      );
    }


  if (
    !body.nombre ||
    !body.email ||
    !body.mensaje ||
    typeof body.nombre !== "string" ||
    typeof body.email !== "string" ||
    typeof body.mensaje !== "string" ||
    (body.telefono && typeof body.telefono !== "string") ||
    body.nombre.length > 100 ||
    body.email.length > 100 ||
    body.mensaje.length > 1000 ||
    !isValidEmail(body.email) ||
    (body.telefono && !isValidPhone(body.telefono))
  ) {
    return new Response(
      JSON.stringify({ success: false, error: "Datos inválidos" }),
      { status: 400 }
    );
  }

  const payload = {
    fields: [
      { name: "firstname", value: body.nombre },
      { name: "email", value: body.email },
      { name: "phone", value: body.telefono || "" },
      { name: "texto", value: body.mensaje },
    ],
    context: {
      pageUri: "https://www.infinitosmascotas.com.ar/contacto",
      pageName: "Contacto",
    },
  };

  const response = await fetch(HUBSPOT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("HubSpot API error:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
