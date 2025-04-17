document.getElementById("generateBtn").addEventListener("click", async () => {
    const jobDesc = document.getElementById("jobDesc").value;
    const company = extractCompany(jobDesc);
    const question = detectQuestion(jobDesc);
  
    const answer = await generateAnswer(question, company);
    document.getElementById("answer").innerText = answer;
  });
  
  document.getElementById("copyBtn").addEventListener("click", () => {
    const answer = document.getElementById("answer").innerText;
    navigator.clipboard.writeText(answer);
  });
  
  function extractCompany(text) {
    const match = text.match(/(?:at|At)\s([A-Z][a-zA-Z0-9]+(?:\s[A-Z][a-zA-Z0-9]+)?)/);
    return match ? match[1] : "the company";
  }
  
  function detectQuestion(text) {
    // If you want to use AI to detect question in future, extend here
    return "Why do you want to work with us?";
  }
  
  async function generateAnswer(question, company) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openchat/openchat-7b",
          messages: [
            {
              role: "user",
              content: `Job question: \"${question}\"\nCompany: ${company}\nAnswer like a human with confidence and clarity.`
            }
          ]
        })
      });
  
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        return data.choices[0].message.content;
      } else {
        return "Error: No response from model.";
      }
    } catch (error) {
      console.error("Error generating answer:", error);
      return "Error generating response.";
    }
  }
  