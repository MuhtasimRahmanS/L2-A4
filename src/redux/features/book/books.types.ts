export type Genre =
| "FICTION"
| "NON_FICTION"
| "SCIENCE"
| "HISTORY"
| "BIOGRAPHY"
| "FANTASY";


export interface Book {
_id: string;
title: string;
author: string;
genre: Genre;
isbn: string;
description?: string;
copies: number;
available: boolean;
createdAt: string;
updatedAt: string;
}


export interface CreateBookPayload {
title: string;
author: string;
genre: Genre;
isbn: string;
description?: string;
copies: number;
available?: boolean;
}


export interface UpdateBookPayload {
title?: string;
author?: string;
genre?: Genre;
isbn?: string;
description?: string;
copies?: number;
available?: boolean;
}


export interface PaginatedBooksResponse {
success: boolean;
message: string;
data: Book[];
}