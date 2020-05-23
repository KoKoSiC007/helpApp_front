export default function getHeaders() {
    return  {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
