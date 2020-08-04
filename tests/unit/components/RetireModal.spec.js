import { mount } from "@vue/test-utils";
import RetireModal from "@/components/RetireModal.vue";

describe("RetireModal.vue", () => {
  it("valueがtrueならばアクティブである", () => {
    const wrapper = mount(RetireModal, {
      propsData: { value: true }
    });
    expect(wrapper.classes()).toContain("is-active");
  });
  it("valueがfalseならばアクティブではない", () => {
    const wrapper = mount(RetireModal, {
      propsData: { value: false }
    });
    expect(wrapper.classes()).not.toContain("is-active");
  });
  it("初期表示時にパスワードエラーは表示されない", () => {
    const wrapper = mount(RetireModal, {
      propsData: { value: true }
    });
    expect(wrapper.text()).not.toMatch("現在のパスワードは必須です");
  });
  describe("退会ボタンクリックテスト", () => {
    it("パスワードに入力がないときはエラーを表示する", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      wrapper.find("button.is-danger").trigger("click");
      expect(wrapper.text()).toMatch("現在のパスワードは必須です");
    });
    it("パスワードに入力がないときはretireイベントは発生しない", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      wrapper.find("button.is-danger").trigger("click");
      expect(wrapper.emitted().retire).toBeFalsy();
    });
    it("パスワードに入力があるときはretireイベントが発生する", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      wrapper.find("input[type='password']").setValue("password");
      wrapper.find("button.is-danger").trigger("click");
      expect(wrapper.emitted().retire).toBeTruthy();
    });
    it("retireイベントのパラメータに入力されたパスワードがセットされている", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      wrapper.find("input[type='password']").setValue("password");
      wrapper.find("button.is-danger").trigger("click");
      expect(wrapper.emitted().retire[0][0].password).toBe("password");
    });
  });
});
