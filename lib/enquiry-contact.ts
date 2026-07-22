const STORAGE_KEY = "ethnic_studio_enquiry_contact_v1";

export interface SavedContact {
  name: string;
  phone: string;
}

export function getSavedContact(): SavedContact | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedContact) : null;
  } catch {
    return null;
  }
}

export function saveContact(contact: SavedContact): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
}
