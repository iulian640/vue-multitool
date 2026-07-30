import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import CurrencyCard from '../CurrencyCard.vue';
import { getRates } from '@/services/currency';

vi.mock('@/services/currency');

describe('CurrencyCard', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it('Convierte 10 EUR a USD con las tasas de la API', async () => {
        getRates.mockResolvedValue({ EUR: '1', USD: '1.08', JPY: '150' });

        const wrapper = mount(CurrencyCard);
        await flushPromises();

        await wrapper.find('input').setValue('10');

        expect(wrapper.text()).toContain('10.80');
    })

    it('Convierte entre divisas distintas al cambiar los selects', async () => {
        getRates.mockResolvedValue({ EUR: '1', USD: '1.08', JPY: '150' });

        const wrapper = mount(CurrencyCard);
        await flushPromises();

        const selects = wrapper.findAll('select');
        await selects[0].setValue('USD');
        await selects[1].setValue('JPY');
        await wrapper.find('input').setValue('10');

        expect(wrapper.text()).toContain('1388.89');
    })

    it('Muestra un mensaje de error si la API falla', async () => {
        getRates.mockRejectedValue(new Error('API caída'));

        const wrapper = mount(CurrencyCard);
        await flushPromises();

        expect(wrapper.text()).toContain('No se pueden cargar las tasas');
    })
})
