import { Routes,Route,Navigate} from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"


export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/"  element={<JournalPage></JournalPage>} />
        <Route path="/*"  element={<Navigate to="/"></Navigate>}></Route>    
    </Routes>
  )
}
