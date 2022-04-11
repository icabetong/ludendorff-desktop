import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      app_name: "Ludendorff",
      auth: {
        hello: "Hello.",
        welcome_back: "Welcome Back."
      },
      navigation: {
        manage: "Manage",
        account: "Account",
        assets: "Assets",
        inventories: "Inventory Reports",
        issued: "Issued Reports",
        stock_cards: "Stock Cards",
        users: "Users",
        types: "Types",
        departments: "Departments",
        profile: "Profile",
        settings: "Settings",
        reports: "Reports"
      },
      field: {
        email: "Email",
        password: "Password",
        first_name: "First Name",
        last_name: "Last Name",
        permissions: "Permissions",
        position: "Position",
        department: "Department",
        id: 'ID',
        name: 'Name',
        type: "Type",
        type_name: "Type Name",
        stock_number: "Stock Number",
        asset_description: "Description",
        classification: "Classification",
        unit_of_measure: "Unit of Measure",
        unit_value: "Unit Value",
        department_name: "Department Name",
        manager: "Manager",
        asset: "Asset",
        remarks: "Remarks",
        old_password: "Old Password",
        new_password: "New Password",
        confirmation_password: "Confirm Password",
        submitted_date: "Submitted Date",
        search: "Search",
        rows_per_page: "Rows per page:",
        fund_cluster: "Fund Cluster",
        entity_name: "Entity Name",
        entity_position: "Entity Position",
        year_month: "Year Month",
        accountability_date: "Accountability Date",
        items: "Items",
        balance_per_card: "Balance Per Card",
        on_hand_count: "On Hand Count",
        serial_number: "Serial Number",
        unit_price: "Unit Price",
        entries: "Entries",
        article: "Article",
        quantity_issued: "Quantity Issued",
        unit_cost: "Unit Cost",
        responsibility_center: "Responsibility Center",
        date: "Date",
        reference: "Reference",
        receipt_quantity: "Receipt Quantity",
        requested_quantity: "Requested Quantity",
        issue_quantity: "Issue Quantity",
        issue_office: "Issue Office",
        balance_quantity: "Balance Quantity",
        balance_total_price: "Balance Total Price",
        stock_card: "Stock Card",
        item: "Item",
        reorder_point: "Reorder Point",
        supplier: "Supplier",
        not_set: "Not Set",
        total_value: "Total Value",
        amount: "Amount",
        unit: "Unit",
      },
      placeholder: {
        none: "None",
        stock_number: 'example: "OS–XXX–X1–000"',
        asset_description: 'example: "A4 Bond Paper"',
        classification: 'example: "Paper"',
        type: 'example: "Office Supplies"',
        unit_of_measure: 'example: "ream"',
        unit_value: 'example: "99.99"',
        remarks: 'example: "Common Supplies"',
        search: 'Type anything',
        entity_name: 'example: "John Doe"',
        entity_position: 'example: "Instructor II"'
      },
      permission: {
        read: "Read",
        write: "Write",
        delete: "Delete",
        audit: "Audit",
        manage_users: "Manage Users",
        administrative: "Administrative",
      },
      action: {
        update_avatar: "Update Avatar",
        change_name: "Change Name",
        change_password: "Change Password",
        request_reset: "Request Password Reset"
      },
      button: {
        cancel: "Cancel",
        ok: "Ok",
        continue: "Continue",
        add: "Add",
        save: "Save",
        previous: "Previous",
        next: "Next",
        close: "Close",
        delete: "Delete",
        disable: "Disable",
        enable: "Enable",
        export: "Export",
        dismiss: "Dismiss",
        duplicate: "Duplicate",
        show_menu: "Show menu",
        show_drawer: "Show drawer",
        sign_in: "Sign in",
        sign_out: "Sign-out",
        go_to_home: "Go to Home",
        request_asset: "Request Asset",
        create_asset: "Create Asset",
        create_user: "Create User",
        create_stock_card: "Create Stock Card",
        create_report: "Create Report",
        view_qr_code: "View QR Code",
        generate_report: "Generate PDF",
        download: "Download",
      },
      feedback: {
        error_generic: "An internal error occurred",
        authenticating: "Authenticating",
        saving: "Saving",
        empty_type_name: "You forgot to enter the type name",
        empty_department_name: "You forgot to enter the department name",
        empty_asset_stock_number: "You forgot to enter the stock number",
        empty_asset_description: "You forgot to enter the description",
        empty_asset_type: "You forgot to select the type",
        empty_classification: "You forgot to enter the classification",
        empty_unit_of_measure: "You forgot to enter the unit of measure",
        empty_unit_value: "You forgot to enter the unit value",
        empty_asset_remarks: "You forgot to enter the remarks",
        empty_first_name: "You forgot to enter the first name",
        empty_last_name: "You forgot to enter the last name",
        empty_department: "You forgot to enter the department",
        empty_email_address: "You forgot to enter the email address",
        empty_position: "You forgot to enter a position",
        empty_balance_per_card: "You forgot to enter the balance per card",
        empty_on_hand_count: "You forgot to enter the on hand count",
        empty_fund_cluster: "You forgot to enter the fund cluster",
        empty_entity_name: "You forgot to enter the entity name",
        empty_entity_position: "You forgot to enter the entity position",
        empty_year_month: "You forgot to enter the year and month",
        empty_accountability_date: "You forgot to enter the accountability date",
        empty_quantity_issued: "You forgot to enter the quantity issued",
        empty_responsibility_center: "You forgot to enter the responsibility center",
        asset_created: "Asset created successfully",
        asset_updated: "Asset updated successfully",
        asset_removed: "Asset removed successfully",
        type_created: "Type created successfully",
        type_updated: "Type updated successfully",
        type_removed: "Type removed successfully",
        user_created: "User created successfully",
        user_updated: "User updated successfully",
        user_removed: "User removed successfully",
        department_created: "Department created successfully",
        department_updated: "Department updated successfully",
        department_removed: "Department removed successfully",
        inventory_created: "Inventory Report created successfully",
        inventory_updated: "Inventory Report updated successfully",
        inventory_removed: "Inventory Report removed successfully",
        issued_report_created: "Issued Report created successfully",
        issued_report_updated: "Issued Report updated successfully",
        issued_report_removed: "Issued report removed successfully",
        stock_card_created: "Stock Card created successfully",
        stock_card_updated: "Stock Card updated successfully",
        stock_card_removed: "Stock Card removed successfully",
        asset_create_error: "Error creating asset",
        asset_update_error: "Error updating asset",
        asset_remove_error: "Error removing asset",
        category_create_error: "Error creating category",
        category_update_error: "Error updating category",
        category_remove_error: "Error removing category",
        user_create_error: "Error creating user",
        user_update_error: "Error updating user",
        user_remove_error: "Error removing user",
        department_create_error: "Error creating department",
        department_update_error: "Error updating department",
        department_remove_error: "Error removing department",
        inventory_create_error: "Error creating inventory report",
        inventory_update_error: "Error updating inventory report",
        inventory_remove_error: "Error removing inventory report",
        issued_report_create_error: "Error creating issued report",
        issued_report_update_error: "Error updating issued report",
        issued_report_remove_error: "Error removing issued report",
        stock_card_create_error: "Error creating stock card",
        stock_card_update_error: "Error updating stock card",
        stock_card_remove_error: "Error removing stock card",
        reset_link_sent: "Password reset link sent",
        empty_copies: "Number of copies cannot be empty",
        name_changed: "Name changed successfully",
        password_changed: "Password changed successfully",
        avatar_changed: "Profile Picture changed successfully",
        name_change_error: "Error updating name",
        password_change_error: "Error updating password",
        avatar_change_error: "Error updating user profile picture",
      },
      error: {
        no_permissions_header: "Insufficient Permissions",
        no_permissions_summary_read: "The page you are trying to reach is restricted. Contact the system administrator for assistance.",
        no_permissions_summary_write: "Unfortunately, you do not have the proper permissions to perform this operation. Contact the system administrators for assistance.",
        not_found_header: "Whoops!",
        not_found_summary: "We can't seem to find that page you're looking for.",
        not_found_info: "Maybe you can head back home and find it there instead?"
      },
      info: {
        user_editor_admin_permission: "Adding \"Administrative\" permission overrides lower permission rules.",
        type_count_not_zero: "There are assets with this type",
        department_count_not_zero: "There are users who are in this department"
      },
      settings: {
        dark_theme: "Dark Theme",
        dark_theme_summary: "Make the interface darker and easier on the eyes.",
        table_row_density: "Table Row Density",
        table_row_density_summary: "Customize the size of the row paddings in the data table.",
        table_row_density_compact: "Compact",
        table_row_density_standard: "Standard",
        table_row_density_comfortable: "Comfortable"
      },
      dialog: {
        sign_out: "Sign out?",
        sign_out_message: "Are you sure you want to end your session? You will need to enter your credentials again next time.",
        asset_remove: "Remove asset?",
        asset_remove_summary: "Do you want to remove this asset? Once finished, this action cannot be undone.",
        type_remove: "Remove type?",
        type_remove_summary: "Do you want to remove this type? Once finished, this action cannot be undone.",
        department_remove: "Remove department?",
        department_remove_summary: "Do you want to remove this department? Once finished, this action cannot be undone.",
        user_disable: "Disable this user account?",
        user_disable_summary: "Are you sure you want to disable this user account? With proper permissions, you can always enable this account in the future.",
        user_enable: "Enable this user account?",
        user_enable_summary: "Are you sure you want to enable this user account? With proper permissions, you can always disable this account in the future.",
        user_remove: "Remove this user?",
        user_remove_summary: "Are you sure you want to remove this user account? All data associated with this account will be removed as well and cannot be recovered.",
        issued_report_remove: "Remove Report?",
        issued_report_remove_summary: "Are you sure you want to remove this report? Once finished, this action cannot be undone.",
        stock_card_remove: "Remove Stock Card?",
        stock_card_remove_summary: "Are you are you want to remove this stock card? Once finished, this action cannot be undone.",
        inventory_remove: "Remove Report?",
        inventory_remove_summary: "Are you sure you want to remove this report? Once finished, this action cannot be undone.",
        send_reset_link_title: "Send Password Reset Link",
        send_reset_link_message: "If you forgot your password for this account, you can request to reset it requesting a reset email.",
        duplicate_title: "Duplicate Record",
        duplicate_summary: "You can create duplicated copy of the records in the database, to avoid manual input.",
        details_type: "Type Details",
        details_asset: "Asset Details",
        details_user: "User Details",
        details_department: "Department Details",
        details_inventory: "Inventory Report Details",
        details_inventory_item: "Inventory Report Item Details",
        details_issued: "Issued Report Details",
        details_issued_item: "Issued Report Item Details",
        details_stock_card: "Stock Card Details",
        details_stock_card_entry: "Stock Card Entry Details",
        select_type: "Select Type",
        select_asset: "Select Asset",
        select_user: "Select User",
        select_department: "Select Department",
        view_qr_code: "View QR-Code",
        view_qr_code_summary: "To save the code, right-click the image then select \"Save Image\".",
        generate_stock_card: "PDF Generation",
        generate_stock_card_summary: "Stock Card Report has been generated, click the button below to save it.",
        generate_stock_card_summary_fetching: "Preparing your stock card report, hold on for a minute...",
      },
      template: {
        full_name: "{{first}} {{last}}",
        count: "Count: {{count}}",
        as_of_year_month: "As of {{yearMonth}}",
        inventory_entity: "For which, {{name}}, {{position}}, Central Luzon State University, is accountable, having assumed such accountability on {{date}}"
      },
      empty: {
        asset: "No Assets Added",
        asset_summary: "There are no assets available.",
        type: "No Types Added",
        type_summary: "There are no types available that can be used to organize the assets.",
        user: "No Users Added",
        user_summary: "There are no users available.",
        department: "No Departments Added",
        department_summary: "There are no departments available that can be used to assign the users from.",
        search: "No Results",
        search_summary: "There are no items matched on your query \"{{query}}\"",
        inventory_header: "No Inventory Reports Available",
        inventory_summary: "There are no Physical Count of Inventories Reports that are available on the database.",
        stock_card_header: "No Stock Cards Added",
        stock_card_summary: "There are no Stock Cards that are available on the database.",
        issued_reports_header: "No Issued Items Reports Available",
        issued_reports_summary: "There are no Supplies and Materials Issued Reports that are available on the database."
      },
      document: {
        stock_card: "Stock Card",
        inventory: "Report on the Physical Count of Inventories",
        issued: "Report of Supplies and Materials Issued"
      },
      not_yet_returned: "Not Yet Returned",
      no_remarks: "No Remarks",
      no_location_data: "No Location Provided",
      unknown: "Unknown",
      information: "Information",
      actions: "Actions",
    }
  }
}

i18n.use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  }).then(() => {
});

export default i18n;