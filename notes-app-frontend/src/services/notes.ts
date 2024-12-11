import { fetchFromBackend } from "./httpFetch";
import { Dispatch } from "redux";
import Swal from "sweetalert2";

export type Note = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const fetchUserNotes = async (
  token: string | null | undefined,
  signal?: AbortSignal,
  dispatch?: Dispatch
): Promise<Note[]> => {
  if (!token) {
    throw new Error("La sesión no cuenta con token de acceso");
  }

  try {
    const response = await fetchFromBackend(
      "/api/notes",
      "GET",
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      signal,
      dispatch
    );

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
  token: string | null | undefined,
  noteId: string | number | null | undefined,
  signal?: AbortSignal,
  dispatch?: Dispatch
): Promise<Note> => {
  if (!token) {
    throw new Error("La sesión no cuenta con token de acceso");
  }

  if (!noteId) {
    throw new Error("El id de la nota no es valido");
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
      },
      signal,
      dispatch
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

const deleteNote = async (
  noteId: string | number | null | undefined,
  token: string | null | undefined,
  signal?: AbortSignal,
  dispatch?: Dispatch
) => {
  if (!token) {
    throw new Error("La sesión no cuenta con token de acceso");
  }

  if (!noteId) {
    throw new Error("El id de la nota no es valido");
  }

  const prompt = await Swal.fire({
    title: "Eliminar Nota",
    text: "¿Está seguro que quiere eliminar esta nota?, las notas eliminadas no se podran restaurar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  if (!prompt.isConfirmed) {
    return false;
  }

  try {
    const response = await fetchFromBackend(
      `/api/notes/${noteId}`,
      "DELETE",
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }        
      },
      signal,
      dispatch
    );

    await Swal.fire({
      title: "Bien!",
      text: response.message,
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn("Error fetching user notes:", error.message || error);
    } else {
      console.warn("Unknown error occurred", error);
    }
    throw error;
  }
};

export { fetchUserNotes, fetchNoteById, deleteNote };
