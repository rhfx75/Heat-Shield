export const CONTACT = {
  company: "Heat Shield Engineering",
  address: { street: "90 Gulshan Badda Link Rd", city: "Dhaka", postalCode: "1212", country: "Bangladesh" },
  addressLine: "90 Gulshan Badda Link Rd, Dhaka 1212, Bangladesh",
  phones: [
    { label: "Mobile", display: "+880 1954-823265", tel: "+8801954823265" },
    { label: "Hotline", display: "+880 9658-586140", tel: "+8809658586140" }
  ],
  email: "heatshieldengineering@gmail.com",
  whatsapp: "https://wa.me/8801954823265",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("90 Gulshan Badda Link Rd, Dhaka 1212")
} as const;

export type Contact = typeof CONTACT;
export function whatsappWithText(text: string) { return CONTACT.whatsapp + '?text=' + encodeURIComponent(text); }
