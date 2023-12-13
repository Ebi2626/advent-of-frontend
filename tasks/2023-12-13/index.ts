enum CodingMethods {
    B64 = 'b64',
    C13 = 'c13',
    URI = 'uri',  
}

export function decodeMessage(template: string, values: Record<string, string>): string {
    let result = template;

    for(const val in values) {
        const code = values[val].slice(0,3);
        const value = values[val];
        let decodedValue = '';
        switch(code) {
            case CodingMethods.B64:
                decodedValue = decodeBase64(value);
                break;
            case CodingMethods.C13:
                decodedValue = decodeCustomEncoding(value);
                break;
            case CodingMethods.URI:
                decodedValue = decodeUri(value);
                break;
        }

        result = result.replace(val, decodedValue);
    };
    return clearTemplate(result, Object.keys(values).length === 0);
  }


  function decodeBase64(encodedText: string): string {
    try {
      // Sprawdzamy, czy tekst zawiera prefiks "b64:", który możemy zignorować podczas dekodowania
      const prefix = "b64:";
      if (encodedText.startsWith(prefix)) {
        encodedText = encodedText.slice(prefix.length);
      }
  
      // Dekodujemy tekst z Base64
      const decodedText = Buffer.from(encodedText, 'base64').toString('utf-8');
  
      return decodedText;
    } catch (error) {
      console.error("Błąd podczas dekodowania Base64:", error);
      return "";
    }
  }

  function decodeCustomEncoding(encodedText: string): string {
    const firstPossibleIndex = 97;
    try {
      const prefix = "c13:";
      if (encodedText.startsWith(prefix)) {
        encodedText = encodedText.slice(prefix.length);
      }
  
      let decodedText = "";
  
      for (const char of encodedText) {
        const index = char.charCodeAt(0);
  
        if (!isNaN(index)) {
          let charIndex = index - 13 > firstPossibleIndex ? index - 13 : index + 13;  
          decodedText += String.fromCharCode(charIndex);
        } else {
          console.error("Błąd podczas dekodowania niestandardowego kodowania: Nieprawidłowy fragment", char);
          return "";
        }
      }
  
      return decodedText;
    } catch (error) {
      console.error("Błąd podczas dekodowania niestandardowego kodowania:", error);
      return "";
    }
  }

  function decodeUri(encodedText: string): string {
    try {
        const prefix = "uri:";
        if (encodedText.startsWith(prefix)) {
          encodedText = encodedText.slice(prefix.length);
        }
      // Zmiana "+" na spacje przed zdekodowaniem
      const replacedText = encodedText.replace(/\+/g, ' ');
      
      // Zdekodowanie URL
      const decodedText = decodeURIComponent(replacedText);
  
      return decodedText;
    } catch (error) {
      console.error("Błąd podczas dekodowania URL:", error);
      return "";
    }
  }

  function clearTemplate(text: string, removePlaceholders: boolean) {
    const begginingRegex = /\{\{ /g;
    const endingRegex = / \}\}/g;
    const patternRegex = /\{\{ \S* \}\}/g;

    if(!removePlaceholders) {
        return text.replace(begginingRegex, '').replace(endingRegex, '');
    }

    return text.replace(patternRegex, '');
  }