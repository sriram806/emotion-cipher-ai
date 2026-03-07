export default function EmotionBadge({ emotion }: { emotion: string }) {

    const map: Record<string, string> = {
        joy: "😊",
        sadness: "😢",
        anger: "😡",
        fear: "😨"
    }

    return (

        <div className="flex items-center gap-2">

            <span className="text-2xl">
                {map[emotion.toLowerCase()] as any || "🙂"}
            </span>

            <span>{emotion}</span>

        </div>

    )

}