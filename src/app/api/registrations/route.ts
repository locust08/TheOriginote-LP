import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RegistrationPayload = {
  fullName?: unknown;
  email?: unknown;
  skinType?: unknown;
  category?: unknown;
  concerns?: unknown;
  selectedProductIds?: unknown;
};

function asCleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export async function POST(request: Request) {
  let payload: RegistrationPayload;
  try {
    payload = (await request.json()) as RegistrationPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const fullName = asCleanString(payload.fullName);
  const email = asCleanString(payload.email);
  const skinType = asCleanString(payload.skinType) || null;
  const category = asCleanString(payload.category) || null;
  const concerns = asStringArray(payload.concerns);
  const selectedProductIds = asStringArray(payload.selectedProductIds);

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Full name and email are required." },
      { status: 400 },
    );
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        error:
          "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 },
    );
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/registration_submissions`;

  try {
    const insertResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        skin_type: skinType,
        preferred_category: category,
        concerns,
        selected_product_ids: selectedProductIds,
      }),
    });

    const responseBody = (await insertResponse
      .json()
      .catch(() => null)) as
      | Array<{ id?: number; submitted_at?: string }>
      | { message?: string; code?: string; hint?: string }
      | null;

    if (!insertResponse.ok) {
      const errorPayload = responseBody as
        | { message?: string; code?: string; hint?: string }
        | null;

      const isRlsError = errorPayload?.code === "42501";
      return NextResponse.json(
        {
          error:
            errorPayload?.message ??
            "Failed to save registration data in Supabase.",
          hint: isRlsError ? "Check service-role key configuration." : errorPayload?.hint ?? null,
        },
        { status: insertResponse.status },
      );
    }

    const insertedRow = Array.isArray(responseBody) ? responseBody[0] : null;

    return NextResponse.json({
      ok: true,
      id: insertedRow?.id ?? null,
      submittedAt: insertedRow?.submitted_at ?? null,
    });
  } catch (error) {
    console.error("Failed to save registration submission:", error);
    return NextResponse.json(
      { error: "Failed to save registration data." },
      { status: 500 },
    );
  }
}
