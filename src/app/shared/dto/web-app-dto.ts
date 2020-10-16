export namespace WebAppDTO {
    export interface IPatientNoteDTO {
        patientNoteID: number;
        createdUTC: Date;
        patientID: number;
        text: string;
    }
    export class PatientNoteRequest {
        patientID: number = 0;
        text: string = "";
    }
    export interface IPagedResponseList<T> {
        pageSize: number;
        currentPage: number;
        data: T[];
        totalRecords: number;
        totalPages: number;
    }

    export interface IPaymentSchedule {
        startDate: Date;
        length: number;
        unit: string;
        totalOccurrences: number;
    }

    export interface IOrganizationDTO {
        organizationID: number;
    }

    export interface IAddress {
        firstName: string;
        lastName: string;
        street1: string;
        street2?: any;
        city: string;
        state: string;
        zip: string;
    }

    export interface ICreditCard{
        ccType: string;
        ccNumber: string;
        expirationMonth: string;
        expirationYear: string;
        cvv: string;
    }

    export interface IBankInfo{

        bankName: string;
        bankAccountType: string;
        bankABARoutingNumber: string;
        bankAccountNumber: string;
        bankAccountName: string;
    }
    export interface IPaymentProfile {
        paymentMethod: PaymentMethod;
        cardNumber: string;
        expirationDate: string;
        routingNumber: string;
        accountNumber: string;
        nameOnAccount: string;
        bankName: string;
        billingAddress: IAddress;
    }

    export interface IProfile {
        paymentProfile: IPaymentProfile;
        shippingAddress: IAddress;
        description: string;
        email: string;
    }

    export interface ISubscriptionDetails {
        subscriptionId: string;
        name: string;
        paymentSchedule: IPaymentSchedule;
        amount: number;
        status: PaymentSubscriptionStatus;
        profile: IProfile;
    }

    export interface IProductDTO {
        productID: number;
        productName: string;
        productDescription: string;
        productPrice: number;
        productImage: string;
        active: boolean;
        productMarket: string;
        isDicountable: boolean;
        defaultOrderNum: number;
        culture: string;
        code: number;
        sortOrder: number;
        isRecurringCharge: boolean;
        isPillbox: boolean;
        boxModelID: number;
      
    }
    export interface IOrderResponse{
        orderID?: number;
        error?: string;
        errorMessage?:string;
    }
    export interface IOrderDTO {
        orderID?: number;
        customerEmail: string;
        createdOn?: Date;
        orderTotal: number;
        shippingCost: number;
        orderComment: string;
        boxSerials: string;
        isConsumer: boolean;
        creditCard: ICreditCard;
        bankInfo: IBankInfo;
        customerPhone?: string;
        transactionID: string;
        subscriptionID: string;
        oneTimeCost?: number;
        recurringCost?: number;
        shippingMethod: ShippingMethod;
        orderStatus: OrderStatus;
        paymentMethod: PaymentMethod;
        summary: string;
        customerName: string;
        singleBoxFulfilledOrder?: boolean;
        shippingAddress: IAddress;
        billingAddress: IAddress;
        orderDetails: IOrderDetailDTO[];
        organization: IOrganizationDTO;
        group?: IGroupDTO;
    
    }

    export interface IGroupDTO {
        groupID: number;
        organizationID: number;
        adminProfileID?: number;
        groupName: string;
        groupDescription: string;
        active: boolean
        isRoot: boolean
    }

    export interface IOrderDetailDTO {
        orderDetailID: number;
        orderID: number;
        totalNumber: number;
        totalAmount: number;
        product: IProduct;
        summary: string;
    }


    export interface IProduct {
        productID: number;
        productName: string;
        productDescription: string;
        productPrice: number;
        active: boolean;
        isPillbox: boolean;
        isRecurringCharge: boolean;
    }
    
    export interface IAddressDTO {
        addressID: number;
        recipientName: string;
        street1: string;
        street2?: string;
        city: string;
        state: string;
        zip: string;
    }

    export interface IShipmentDTO {
        shipmentID: number;
        createdUTC: Date;
        shippedUTC?: Date;
        isConsumerOrder: boolean;
        boxQuota: number;
        carrierTrackingCode?: string;
        loweredCarrierTrackingCode?: string;
        shippingCarrierNumber?: string;
        boxes: IBoxDTO[];
        address: IAddressDTO;
        shippingMethod: ShippingMethod;
        carrier: ShippingCarrier;
        status: ShipmentStatus;
        labelImage?: string;
        trayCount: number;
        canBeShipped: boolean;
        recipientPhone: string;
        recipientEmail?: string;
    }

    export interface IBoxDTO {
        boxID: number;
        serialNum: string;
        shippingName: string;
        shippingAddress1?: string;
        shippingAddress2?: string;
        comment: string;
        dateAssembled: Date;
        dateShipped: Date;
        groupID: number;
        orderID?: number;
      
    }


    export class SubscriptionDetailsRequest {
        paymentMethod: PaymentMethod = PaymentMethod.CreditCard;
        subscriptionId: string;
        patientProfileId: number;
        cardNumber: string;
        expirationYear: string;
        expirationMonth: string;
        cardCode: string
        routingNumber: string;
        accountNumber: string;
        nameOnAccount: string;
        bankName: string;
        firstName: string;
        lastName: string;
        street1: string;
        street2?: string;
        city: string;
        state: string;
        zip: string;

        constructor(patientProfileId: number, subscriptionDetails: ISubscriptionDetails) {
            if (subscriptionDetails == undefined || subscriptionDetails == null) return;
            this.subscriptionId = subscriptionDetails.subscriptionId;
            this.paymentMethod = subscriptionDetails.profile.paymentProfile.paymentMethod;
            this.bankName = subscriptionDetails.profile.paymentProfile.bankName;
            this.nameOnAccount = subscriptionDetails.profile.paymentProfile.nameOnAccount;
            this.patientProfileId = patientProfileId;
            if (subscriptionDetails.profile && subscriptionDetails.profile.paymentProfile && subscriptionDetails.profile.paymentProfile.billingAddress) {
                this.firstName = subscriptionDetails.profile.paymentProfile.billingAddress.firstName;
                this.lastName = subscriptionDetails.profile.paymentProfile.billingAddress.lastName;
                this.street1 = subscriptionDetails.profile.paymentProfile.billingAddress.street1;
                this.street2 = subscriptionDetails.profile.paymentProfile.billingAddress.street2;
                this.city = subscriptionDetails.profile.paymentProfile.billingAddress.city;
                this.state = subscriptionDetails.profile.paymentProfile.billingAddress.state;
                this.zip = subscriptionDetails.profile.paymentProfile.billingAddress.zip;
            }
        }
    }

    export interface IPatientCaregiver {
        profileID: number;
        firstName: string;
        lastName: string;
        relationship: string;
        phone: string;
        role: string;
        accountabilityID: PatientRelationship;
        invite: boolean;
        canEditCaregiver: boolean;
        canDeleteCaregiver: boolean;
    }

    export interface IGreetingConfiguration {
        configID: number;
        patientProfileID: number;
        greetingID: number;
        greetingTypeID: GreetingType;
        greetingFilename: string;
        greetingFileCheckSum: number;
        isDisabled: boolean;
        slotID: number;
        modifiedUserID: number;
        dosageTime?: number;
        playDate?: Date;
        audioBucket: number;
        downloadedOn?: any;
    }

    export interface IUserEventNotification extends IUserEventNotificationRequest {
        eventID: number;
        description: string;
        email: boolean;
        sms: boolean;
        phone: boolean;
        ordering: number;
        emailEnabled: boolean;
        smsEnabled: boolean;
        phoneEnabled: boolean;
    }

    export interface IUserEventNotificationRequest {
        eventID: number;
        email: boolean;
        sms: boolean;
        phone: boolean;
    }
    export interface ICaregiverUserProfile {
        userProfileID: number;
        userID: string;
        firstname: string;
        lastname: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        timeZoneID: number;
        birthdate?: Date;
        homePhone: string;
        businessPhone?: string;
        cellPhone: string;
        smsEmail: string;
        alternateEmail?: string;
        customerID: number;
        applyDST: boolean;
        isPatient: boolean;
        emailAddress: string;
        cellPhoneCarrierID?: string;
        securityAnswer: string;
        useNetworkTimeZone: boolean;
        emergencyServicePhoneNumber?: string;
        emergencyServicePhoneVolume: number;
    }

    export interface ITimeZoneDTO {
        timezoneID: number;
        name: string;
        offset: number;
    }

    export interface IUserRelationshipDTO {
        relationshipID: number;
        relationship: string;
    }

    export interface ICaregiverProfile {
        caregiverUserProfile: ICaregiverUserProfile;
        relationship: string;
        userName: string;
    }

    export interface ICaregiverSendInviteRequest {
        caregiverId?: number;
        message: string;
        primaryCaregiver: boolean;
        transfer: boolean;
    }

    export interface IUserResponse {
        userProfileId: number;
        roles: string[];
    }
    export enum ShippingCarrier {
        UPS = 'UPS' // 1
    }
    export enum ShipmentStatus {
        New = 'New', // 1,
        Sent = 'Sent', // 2,
        Arrived = 'Arrived', // 3,
        Problem = 'Problem' // 4
    }
    export interface IPatientPillboxState {
        lastSignalStrength: number;
        firmwareVersionMajor: number;
        firmwareVersionMinor: number;
        lastHeartbeat: Date;
    }

    export enum GreetingType {
        Reminder = 1,
        PositiveFeedback = 2,
        TriggerEvent = 3
    }

    export enum DosageTime {
        Morning = 0,
        Noon = 1,
        Evening = 2,
        Night = 3
    }

    export enum PatientRelationship {
        MainCaregiver = 1,
        Caregiver = 2,
        CustomerAdmin = 3,
        SystemAdmin = 4,
        CustomerMonitor = 5,
        GroupUser = 6,
        GroupAdmin = 7
    }

    export enum EventType {
        LoggedEvent = 0,
        AlertableEvent = 1,
        Report = 2
    }

    export enum Role {
        Admin = "Administrator",
        CustomerAdmin = "CustomerAdmin",
        GroupAdmin = "GroupAdmin"
    }
    export enum PaymentMethod {
        CreditCard = 1,
        ECheck = 2
    }
    export enum PaymentSubscriptionStatus {
        Active = 1,
        Expired,
        Suspended,
        Canceled,
        Terminated,
        Unknown
    }
    export enum ContactMethod {
        Phone = 'Phone',
        SupportForm = 'SupportForm',
        Email = 'Email'
    }

    export enum ReplacementStatus {
        Requested = 'Requested',
        ReplacementBoxSent = 'ReplacementBoxSent',
        Completed = 'Completed',
        ChargedDeposit = 'ChargedDeposit',
        RefundedDeposit = 'RefundedDeposit'
    }

    export enum ShippingMethod {
        Standard = 'Standard',
        TwoDay = 'TwoDay',
        Overnight = 'Overnight'
    }
    export enum OrderStatus {
        New = '1',
        Shipped = 'Shipped',
    }
    export enum BoxModel {
        Maya = 1,
        Jon = 2,
        MayaWithAlert = 3,
        JonWithAlert = 4
    }
}
