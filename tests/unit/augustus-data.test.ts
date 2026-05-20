import { augustusData } from "../../app/lib/augustus-data";

describe("augustusData", () => {
  it("should expose public business contact info", () => {
    expect(augustusData.brand.name).toBe("Augustu's Barbearia");
    expect(augustusData.brand.phoneRaw).toMatch(/^55\d{10,11}$/);
    expect(augustusData.brand.whatsappUrl).toContain(`wa.me/${augustusData.brand.phoneRaw}`);
    expect(augustusData.brand.instagramHandle).toContain("augustobarbeariaoficial");
  });

  it("should include at least five gallery images", () => {
    expect(augustusData.gallery.length).toBeGreaterThanOrEqual(5);
    const sources = augustusData.gallery.map((item) => item.src);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("should define complete navigation anchors", () => {
    const hrefs = augustusData.nav.map((item) => item.href);
    expect(hrefs).toContain("/#inicio");
    expect(hrefs).toContain("/#servicos");
    expect(hrefs).toContain("/#galeria");
    expect(hrefs).toContain("/#contato");
  });
});
