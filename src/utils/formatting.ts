// formatting.ts
export const formatVoteAverage = (voteAverage: number | undefined): string => {
    if (voteAverage === undefined) {
        return 'N/A';
    }
    return voteAverage.toFixed(1);
}

export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
}