export function formatPostedDate(date: Date): string {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date >= today) {
        return 'Today'
    } else if (date >= yesterday) {
        return 'Yesterday'
    } else {
        return date.toLocaleDateString('az-AZ', {
            month: 'long',
            day: 'numeric'
        })
    }
}

export function isNewPost(date: Date): boolean {
    const now = new Date()
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    return date >= weekAgo
}