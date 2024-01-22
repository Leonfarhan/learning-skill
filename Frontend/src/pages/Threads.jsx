import CardThreads from "../components/CardThreads";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";


export default function Threads() {
  return (
    <div className="flex fixed">
      <Sidebar />
      <section className="flex-1 p-10">
        <Search placeHolderText="Cari threads yang kamu inginkan"/>
        <CardThreads />
      </section>
    </div>
  );
}
