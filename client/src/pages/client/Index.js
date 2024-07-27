import Navbar from "./Navbar";
import Hero from "./Hero";
import Feature from "./Feature";

const Client = () => {
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Navbar />
        <Hero />
        <Feature />

        {/* <dialog>
          <form method="dialog">
            <h1>This is a dialog</h1>
            <button type="submit">Login</button>
          </form>
        </dialog> */}
      </div>
    </>
  );
};

export default Client;
