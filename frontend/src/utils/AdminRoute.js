import { useKeycloak } from "@react-keycloak/web";

const AdminRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 const isAdmin = keycloak.authenticated && keycloak.hasRealmRole("admin")

 return isLoggedIn && isAdmin ? children : null;
};

export default AdminRoute;