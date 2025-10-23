import ShinyText from "@/components/shared/effects/shinyText/ShinyText";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
      <ShinyText
        text="SocialMedia"
        disabled={ false }
        speed={ 3 }
        className="text-3xl font-bold"
        theme={ "dark" }
      />
    </div>
  );
};
