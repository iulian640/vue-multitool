import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import WeatherCard from '../WeatherCard.vue';
import { getWeather } from '@/services/weather';

vi.mock('@/services/weather');

describe('WeatherCard', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it('Muestra ciudad, temperaturas y estado del cielo', async () => {
        getWeather.mockResolvedValue({
            name: 'Oviedo',
            temperatures: { max: 21, min: 12 },
            stateSky: { description: 'Despejado' },
        });

        const wrapper = mount(WeatherCard);
        await flushPromises();

        expect(wrapper.text()).toContain('Oviedo');
        expect(wrapper.text()).toContain('21');
        expect(wrapper.text()).toContain('12');
        expect(wrapper.text()).toContain('Despejado');
    })

    it('Muestra un mensaje de error si la API falla', async () => {
        getWeather.mockRejectedValue(new Error('API caída'));

        const wrapper = mount(WeatherCard);
        await flushPromises();

        expect(wrapper.text()).toContain('No se pueden cargar los datos');
    })
})
