import InvoiceDetail from "./invoiceDetail";

class Invoice {
    constructor(invoiceId, status, dateOrder, totalPrice, invoiceDetail=[]) {
        this.invoiceId = invoiceId;
        this.status = status;
        this.dateOrder = dateOrder;
        this.totalPrice = totalPrice;
        this.invoiceDetail = invoiceDetail;
    }
}

export default Invoice;
