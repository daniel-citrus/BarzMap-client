/** Submission record as used by ParkSubmissionViewer and dashboard list */
export interface SubmissionView {
    id: number;
    title?: string;
    parkName?: string;
    description?: string;
    parkDescription?: string;
    parkAddress?: string;
    address?: string;
    submittedAt?: string;
    date?: string;
    user?: string;
    submitter?: string;
    moderationComment?: string;
    status?: string;
    equipment?: (string | { id?: number; name?: string; description?: string })[];
}

/** Action item for submission actions menu and moderation panel */
export interface SubmissionAction {
    id: string;
    title: string;
    action: (id: number | string) => void | Promise<void>;
    showInModeration?: boolean;
    buttonClassName?: string;
}

/** Image item for upload box (preview + file). Compatible with SubmitParkImage for API submission. */
export interface SelectedImage {
    id: string;
    preview: string;
    file: File;
    [key: string]: unknown;
}

/** Lat/lng shape used by LocationSelector (numbers or empty string when clearing) */
export interface LatLngState {
    lat: number | string;
    lng: number | string;
}
