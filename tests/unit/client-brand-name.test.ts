import { resolveBrandNameFromRepository } from "../../app/lib/client-brand-name";

describe("resolveBrandNameFromRepository", () => {
  it("deve montar nome a partir da pasta do repositório sem sufixo -site", () => {
    const resolved = resolveBrandNameFromRepository(
      "Elegância Barbearia",
      "C:/repos/elegancia-barbearia-site",
    );

    expect(resolved).toBe("Elegância Barbearia");
  });

  it("deve manter acentos quando já existem no nome base", () => {
    const resolved = resolveBrandNameFromRepository(
      "São João Barbearia",
      "C:/repos/sao-joao-barbearia-site",
    );

    expect(resolved).toBe("São João Barbearia");
  });

  it("deve fazer fallback para Title Case quando não houver palavra correspondente", () => {
    const resolved = resolveBrandNameFromRepository(
      "Cliente Base",
      "C:/repos/nova-era-barber-shop-site",
    );

    expect(resolved).toBe("Nova Era Barber Shop");
  });
});
