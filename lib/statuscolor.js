export default function statusColorGenerator(state) {
    switch (state) {
        case "paid": return "green";
        case "cancelled": return "red";
        case "failed": return "purple";
        case "refunded": return "blue"
    }
}