import { fetchFromBackend } from "./httpFetch";

export type Note = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const fetchUserNotes = async (
  token: string,
  signal?: AbortSignal
): Promise<Note[]> => {
  if (!token) {
    throw new Error("La sesión no cuenta con token de acceso");
  }

  try {
    const response = await fetchFromBackend("/api/notes", "GET", undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!Array.isArray(response)) {
      throw new Error(
        "Hubo una respuesta del servidor en un formato no esperado..."
      );
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn("Error fetching user notes:", error.message || error);
    } else {
      console.warn("Unknown error occurred", error);
    }
    throw error;
  }
};

const fetchNoteById = async (
  token: string,
  noteId: string | number,
  signal?: AbortSignal
): Promise<Note> => {
  if (!token) {
    throw new Error("La sesión no cuenta con token de acceso");
  }

  try {
    const response = await fetchFromBackend(
      `/api/notes/${noteId}`,
      "GET",
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      }
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn("Error fetching user notes:", error.message || error);
    } else {
      console.warn("Unknown error occurred", error);
    }
    throw error;
  }
};

export { fetchUserNotes, fetchNoteById };
