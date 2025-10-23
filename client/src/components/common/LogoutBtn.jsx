import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice/authSlice.thunk";
import { handleErrorMsg, handleSuccessMsg } from "../../utils/toast";

const LogoutBtn = ({ classname }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      handleSuccessMsg(result?.msg);
    } catch (err) {
      console.log(err);
      handleErrorMsg(err);
    }
  };

  return (
    <button
      className={`${classname} w-full py-2 cursor-pointer flex  items-center   gap-2 hover:bg-secondary-hover transition-all duration-300 `}
      onClick={handleLogout}
    >
      <LogOut size={17} /> Logout
    </button>
  );
};

export default LogoutBtn;
