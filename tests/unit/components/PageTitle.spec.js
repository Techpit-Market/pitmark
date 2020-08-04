import { shallowMount } from "@vue/test-utils";
import PageTitle from "@/components/PageTitle.vue";

describe("PageTitle.vue", () => {
  it("タイトルが表示されること", () => {
    const wrapper = shallowMount(PageTitle, {
      propsData: { title: "サンプルタイトル" }
    });
    expect(wrapper.text()).toMatch("サンプルタイトル");
  });
});
