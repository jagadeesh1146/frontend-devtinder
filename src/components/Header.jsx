import { useSelector } from "react-redux";

const Header = () => {

  const user = useSelector(store=>store.user)

  return (
    <div className="h-20 w-full px-6 bg-gray-900 text-white flex justify-between">
      <h1 className="text-4xl p-4">DevTinder</h1>
      {
        user && (
           <h3 className="text-xl">{user?.firstName}</h3>
        )
      }
     
    </div>
  );
};

export default Header;