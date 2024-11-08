export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/company_detail_form", "/company_manager_form", "/suppliers_form"],
};
