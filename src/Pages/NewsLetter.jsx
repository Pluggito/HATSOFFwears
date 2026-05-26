export default function NewsLetter() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center text-foreground py-10">
      <p className="text-2xl font-bold tracking-tight text-foreground">
        Subscribe now and get 10% off
      </p>
      <p className="text-muted-foreground mt-3 max-w-md mx-auto">
        Stay updated with our latest releases and exclusive offers. Join our
        community today!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-border/80 bg-card rounded-lg overflow-hidden pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none bg-transparent text-foreground py-3 text-sm placeholder:text-muted-foreground"
          type="email"
          placeholder="Enter your Email"
          required
        />
        <button
          type="submit"
          className="bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold px-8 py-4 transition-colors cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
