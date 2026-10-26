import Page from "@/components/althea/Page";
import { Section } from "@/components/maison/ui";
import FrenchEnquiry from "@/components/althea/FrenchEnquiry";
import { pageMetadata } from "@/lib/seo";
import { quickAnswers } from "@/data/quickAnswers";
import "./learn-french.css";

export const metadata = pageMetadata("/learn-french", {
  title: "Learn French: 15 Everyday Phrases",
  description: "Start French with 15 useful words and phrases, English and Hindi meanings, and simple pronunciation tips. Enquire about learning French with Althéa.",
});
const phrases = [
  ["Bonjour", "Hello / Good morning", "नमस्ते / सुप्रभात", "bohn-ZHOOR", "Use when you enter a shop or greet someone during the day."],
  ["Bonsoir", "Good evening", "शुभ संध्या", "bohn-SWAHR", "A polite greeting in the evening."],
  ["Salut", "Hi / Bye", "हाय / बाय", "sah-LEW", "Keep this informal greeting for friends and people you know."],
  ["Au revoir", "Goodbye", "अलविदा / फिर मिलेंगे", "oh ruh-VWAHR", "A polite way to say goodbye in everyday situations."],
  ["Merci", "Thank you", "धन्यवाद", "mehr-SEE", "Say merci when someone helps you."],
  ["S’il vous plaît", "Please", "कृपया", "seel voo PLEH", "Use the polite form with strangers, staff or a group."],
  ["Oui / Non", "Yes / No", "हाँ / नहीं", "wee / nohn", "Two small words you will use every day."],
  ["Excusez-moi", "Excuse me", "माफ़ कीजिए", "ehk-skew-zay MWAH", "Get someone's attention politely before asking a question."],
  ["Je m’appelle…", "My name is…", "मेरा नाम… है", "zhuh mah-PELL", "Add your name to introduce yourself."],
  ["Comment allez-vous ?", "How are you?", "आप कैसे हैं?", "koh-mahn tah-lay VOO", "A polite way to ask someone how they are."],
  ["Je ne comprends pas", "I don’t understand", "मुझे समझ नहीं आया", "zhuh nuh kohn-prahn PAH", "Useful when a conversation is moving too quickly."],
  ["Parlez-vous anglais ?", "Do you speak English?", "क्या आप अंग्रेज़ी बोलते हैं?", "par-lay voo ahn-GLEH", "Start with bonjour, then ask politely."],
  ["Pouvez-vous répéter ?", "Can you repeat?", "क्या आप दोहरा सकते हैं?", "poo-vay voo ray-pay-TAY", "Ask someone to say a word or sentence again."],
  ["Combien ça coûte ?", "How much does it cost?", "इसकी कीमत कितनी है?", "kohn-byan sah KOOT", "Use while shopping or checking a price."],
  ["Où est la gare ?", "Where is the station?", "रेलवे स्टेशन कहाँ है?", "oo eh lah GAHR", "A practical question when finding your way around a city."],
];
export default function LearnFrench() {
  return <Page path="/learn-french" faqs={quickAnswers["/learn-french"]} photo="student-cafe" eyebrow="A LITTLE FRENCH, EVERY DAY" title="Learn French." accent="Start with bonjour." intro="Fifteen useful words and phrases for your first conversations in France. Read the meaning, try saying it aloud, and take one small step towards feeling at home." closing={false} headerActions={<a className="ms-btn ms-btn-gold" href="#french-enquiry">Enquire about learning French</a>}>
    <Section tone="ivory" kicker="YOUR FIRST 15" title="Small phrases." accent="Everyday confidence.">
      <p className="ms-lead">English and Hindi meanings help you get started. The pronunciation hints are approximate: French nasal vowels and the French “r” do not have exact English equivalents.</p>
      <div className="french-phrases">{phrases.map(([french, english, hindi, sound, note], i) => <article className="french-card" key={french}>
        <span className="french-number">{String(i + 1).padStart(2, "0")}</span>
        <h3 lang="fr">{french}</h3><p className="french-meaning">{english}</p><p lang="hi">{hindi}</p>
        <p className="french-sound"><span>Say it approximately</span> {sound}</p><details className="french-tip"><summary>When to use</summary><p className="french-note">{note}</p></details>
      </article>)}</div>
    </Section>
    <Section tone="paper" kicker="TRY A FIRST CONVERSATION" title="Put three phrases" accent="together.">
      <div className="french-dialogue"><p lang="fr">Bonjour ! Je m’appelle…</p><p>Hello! My name is…</p><p lang="fr">Excusez-moi. Parlez-vous anglais ?</p><p>Excuse me. Do you speak English?</p><p lang="fr">Merci. Au revoir !</p><p>Thank you. Goodbye!</p></div>
      <p className="ms-lead">Practise a few phrases each day. Getting comfortable greeting people is a useful first step; this short introduction is not a complete language course.</p>
    </Section>
    <Section tone="ivory" kicker="TAKE THE NEXT STEP" title="Wish to learn French?" accent="Tell us about you.">
      <div id="french-enquiry" className="french-enquiry"><p className="ms-lead">If you wish to learn French, send your enquiry. Share your current level, your goal and when you would like to start. We’ll discuss available options, timings and any fees before you commit.</p><FrenchEnquiry /></div>
    </Section>
  </Page>;
}
