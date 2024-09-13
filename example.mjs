import OpenAI from "openai";
const openai = new OpenAI({ apiKey: 'sk-rYnuwdZDXEMRa-i-F4ISAMr2hyk_SUsCMNJIr_GWt-T3BlbkFJfxlZgJk2VxYyML1uuXw6UUdkrGu3EaJ0pnd-HUzd0A' });
           

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);