import { NextResponse } from 'next/server'
 
export async function POST(req: Request) {
  const apiKey = process.env.PALM_API_KEY
  const body = await req.json()
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        prompt: {
            text: body.text
        },
        temperature: 1.0,
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DEROGATORY',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_TOXICITY',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_VIOLENCE',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUAL',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_MEDICAL',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          }
        ]
        })
    });
  const data = await res.json()
  if (data.candidates && data.candidates.length > 0) {
    const resp = data.candidates[0].output;
    console.log(resp)
    return NextResponse.json({ data: resp })
  }
 
  return NextResponse.json({ data })
}
