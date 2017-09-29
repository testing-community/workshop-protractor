import { browser } from 'protractor';
import {
  MenuContentPage,
  ProductListPage,
  ProductDetailPage,
  ProductAddedModalPage,
  SummaryStepPage,
  SignInStepPage,
  ShippingStepPage,
  PaymentStepPage,
  BankPaymentPage,
  OrderResumePage,
  AddressStepPage
} from '../src/page';

describe('Given a shopping page', () => {
  beforeAll(async () => {
    await browser.get('http://automationpractice.com/');
  });

  describe('when want to buy a T shirt', () => {
    beforeAll(async () => {
      const menuContentPage: MenuContentPage = new MenuContentPage();
      const productListPage: ProductListPage = new ProductListPage();
      const productDetailPage: ProductDetailPage = new ProductDetailPage();
      const productAddedModalPage: ProductAddedModalPage = new ProductAddedModalPage();
      const summaryStepPage: SummaryStepPage = new SummaryStepPage();

      await menuContentPage.goToTShirtMenu();
      await productListPage.selectFirstItem();
      await productDetailPage.addToCart();
      await productAddedModalPage.proceedToCheckout();
      await summaryStepPage.proceedToCheckout();
    });

    describe('and login to the application', () => {
      beforeAll(async () => {
        const signInStepPage: SignInStepPage = new SignInStepPage();
        await signInStepPage.login('aperdomobo@gmail.com', 'WorkshopProtractor');
      });

      describe('and select default address', () => {
        beforeAll(async () => {
          const addressStepPage: AddressStepPage = new AddressStepPage();
          await addressStepPage.proceedToCheckout();
        });

        describe('and pay to the bank', () => {
          const orderResumePage: OrderResumePage = new OrderResumePage();

          beforeAll(async () => {
            const shippingStepPage: ShippingStepPage = new ShippingStepPage();
            const paymentStepPage: PaymentStepPage = new PaymentStepPage();
            const bankPaymentPage: BankPaymentPage = new BankPaymentPage();

            await shippingStepPage.acceptAndContinue();
            await paymentStepPage.payByBankWire();
            await bankPaymentPage.confirmOrder();
          });

          it('then the order should be completed', async () => {
            await expect(orderResumePage.getOrderTitle())
              .toBe('Your order on My Store is complete.');
          });
        });
      });
    });
  });
});
