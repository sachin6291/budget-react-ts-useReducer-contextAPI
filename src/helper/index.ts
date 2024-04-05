export function formatCurrency(amount : number) {
    return new Intl.NumberFormat('es-ES',{
        style: 'currency',
        currency:'EUR'
}).format(amount)}

export const formatDate = (dateStr : string) : string=>{
    const dateObject = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions ={
        weekday: 'long',
        year: 'numeric',
        month:'long',
        day:'numeric'
    }

    return new Intl.DateTimeFormat('en-Au', options).format(dateObject)
}