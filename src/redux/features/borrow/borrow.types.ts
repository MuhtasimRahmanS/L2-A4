export interface BorrowPayload {
book: string; // book _id
quantity: number;
dueDate: string; // ISO
}


export interface BorrowDoc {
_id: string;
book: string;
quantity: number;
dueDate: string;
createdAt: string;
updatedAt: string;
}


export interface BorrowCreateResponse {
success: boolean;
message: string;
data: BorrowDoc;
}


export interface BorrowSummaryRow {
book: { title: string; isbn: string };
totalQuantity: number;
}


export interface BorrowSummaryResponse {
success: boolean;
message: string;
data: BorrowSummaryRow[];
}