export default function getSyllables(word: string): string[] {
    if (word.length < 2) return [word];

    const vowels = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"].join("");
    const syllables: string[] = [];
    let current_syllable: string = "";
    let is_vowel_in_current_syllable: boolean = false;
    for (let i = 0; i < word.length; i++) {
        if (i === 0) {
            current_syllable = word[i];
            continue;
        }
        if (i < word.length - 1 && word[i + 1] === "ь") {
            current_syllable += word[i] + word[i + 1];
            syllables.push(current_syllable);
            current_syllable = "";
            is_vowel_in_current_syllable = false;
            i++;
            continue;
        }

        if (vowels.indexOf(word[i]) !== -1) {
            if (is_vowel_in_current_syllable) {
                syllables.push(current_syllable);
                current_syllable = word[i];
            } else {
                current_syllable += word[i];
                is_vowel_in_current_syllable = true;
            }
        } else {
            if (vowels.indexOf(word[i - 1]) !== -1) {
                if (i < word.length - 1 && vowels.indexOf(word[i + 1]) !== -1) {
                    syllables.push(current_syllable);
                    current_syllable = word[i] + word[i + 1];
                    i++;
                    is_vowel_in_current_syllable = true;
                } else {
                    current_syllable += word[i];
                    syllables.push(current_syllable);
                    current_syllable = "";
                    is_vowel_in_current_syllable = false;
                }
            } else {
                current_syllable += word[i];
            }
        }
    }

    if (current_syllable) {
        for (const cs of current_syllable) {
            if (vowels.indexOf(cs) !== -1) {
                syllables.push(current_syllable);
                return syllables;
            }
        }
        syllables[syllables.length - 1] += current_syllable;
    }

    return syllables;
}
