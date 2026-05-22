import { NextRequest, NextResponse } from "next/server";

// Necessário para compatibilidade com output:'export' (Cloudflare Pages).
// Em produção o handler retorna 404 antes de qualquer API dinâmica ser chamada.
// Este endpoint só tem função em desenvolvimento (next dev).
export const dynamic = "force-static";

const VALID_TIERS = new Set(["basic", "normal", "premium", "superPremium"]);

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const tier = request.nextUrl.searchParams.get("tier") ?? "";
  const redirectTo = request.nextUrl.searchParams.get("to") ?? "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  if (tier && VALID_TIERS.has(tier)) {
    response.cookies.set("_dev_plan", tier, { path: "/", httpOnly: false, sameSite: "lax" });
  } else {
    response.cookies.delete("_dev_plan");
  }

  return response;
}
