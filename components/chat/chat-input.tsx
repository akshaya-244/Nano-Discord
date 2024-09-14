"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import EmojiPicker from "../Emoji-picker";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string | undefined;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});
const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const [output, setOutput] = useState("some val");
  const { onOpen } = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  const generateText = async (prompt: string) => {
    try {
      // use the fetch method to send an http request to /api/generate endpoint

      const myPrompt =
        "Please keep it short and to the point. Be as informal as possible unless told otherwise. And dont add any decorations. Only plain text is needed";
      prompt = prompt + myPrompt;
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      // Waits for the response to be converted to JSON format and stores it in the data variable
      const data = await response.json();

      //  If successful, updates the output state with the output field from the response data
      if (response.ok) {
        console.log("Output: ", data.output);
        setOutput(data.output);

        return data.output;
      } else {
        setOutput(data.error);
      }

      // Catches any errors that occur during the fetch request
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      const inputString = values.content;
      const keyword = "@gemini ";
      if (inputString.includes("@gemini ")) {
        const prompt = inputString.slice(
          inputString.indexOf(keyword) + keyword.length
        );
        const x = await generateText(prompt);
        form.setValue("content", x);
        console.log("Values: ", output);
        console.log("Values: ", x);
      } else {
        await axios.post(url, values);
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
               

<Textarea
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Trigger form submission when Enter is pressed without Shift
      form.handleSubmit(onSubmit)();
    }
  }}
  disabled={isLoading}
                    {...field}
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    className="px-14 bg-zinc-200/90 dark:bg-zinc-600/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
  onInput={(e) => {
    const textarea = e.target as HTMLTextAreaElement; // Cast the target to HTMLTextAreaElement
    textarea.style.height = "auto"; // Reset height to auto to calculate the new height
    textarea.style.height = `${textarea.scrollHeight}px `; // Set height to the scrollHeight of the content
  }}
  
/>
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

export default ChatInput;
