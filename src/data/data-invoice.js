import Invoice from "../model/invoice";
import InvoiceDetail from "../model/invoiceDetail";

const INVOICES = [
    new Invoice(
        240051,
        "Hủy",
        "17-10-2024",
        "150.000 ₫",
        [
            new InvoiceDetail("Gói Gà Đen H'Mông 1 tháng", 2, "25.000 ₫", "50.000 ₫"),
            new InvoiceDetail("Gói Gà Đen H'Mông đầy đủ", 1, "50.000 ₫", "50.000 ₫")
        ]
    ),
    new Invoice(
        240624,
        "Đang xử lí",
        "17-10-2024",
        "150.000 ₫",
        [
            new InvoiceDetail("Gói Gà Đen H'Mông 1 tháng", 2, "25.000 ₫", "50.000 ₫"),
            new InvoiceDetail("Gói Gà Đen H'Mông đầy đủ", 1, "50.000 ₫", "50.000 ₫")
        ]
    ),
    new Invoice(
        240194,
        "Hoàn thành",
        "17-10-2024",
        "150.000 ₫",
        [
            new InvoiceDetail("Gói Gà Đen H'Mông đầy đủ", 3, "50.000 ₫", "150.000 ₫")
        ]
    )
];

export { INVOICES };
