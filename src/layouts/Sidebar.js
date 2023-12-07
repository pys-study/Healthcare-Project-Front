import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "대시보드(starter)",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "알림(alerts)",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "내정보(Badges)",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "식단 관리(Button)",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "영양제(Grid)",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "운동관리(Cards)",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "커뮤니티(Tables)",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "forms(삭제예정)",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "breadcrumb(삭제예정)",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About(삭제예정)",
    href: "/about",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
