export function answerNotNull(answer: string) {
    if (answer.length === 0) {
        return "This field cannot be empty!";
    }
    return true;
}
