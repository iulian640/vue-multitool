import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CalculatorCard from '../CalculatorCard.vue';

describe('CalculatorCard', () => {
    it('Al montar el display muestra 0', () => {
        const wrapper = mount(CalculatorCard)

        expect(wrapper.find('.calc__display').text()).toContain('0')
    })

    it('Pulsar 5 muestra 5', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === '5');

        await boton5.trigger('click');

        expect(wrapper.find('.calc__display').text()).toContain('5');
    })

    it('Pulsar 1 y 2 deja 12', async () => {
        const wrapper = mount(CalculatorCard);

        const boton1 = wrapper.findAll('button').find(n => n.text() === "1");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");

        await boton1.trigger('click');
        await boton2.trigger('click');

        expect(wrapper.find('.calc__display').text()).toContain('12');
    })

    it('5 + 3 dabe dar 8', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === "5")
        const botonMas = wrapper.findAll('button').find(n => n.text() === "+")
        const boton3 = wrapper.findAll('button').find(n => n.text() === "3")
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=")

        await boton5.trigger('click');
        await botonMas.trigger('click');
        await boton3.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toContain('8')
    })

    it('5 - 3 debe dar 2', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === "5");
        const botonMenos = wrapper.findAll('button').find(n => n.text() === "-");
        const boton3 = wrapper.findAll('button').find(n => n.text() === "3");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton5.trigger('click');
        await botonMenos.trigger('click');
        await boton3.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toContain('2')

    })

    it('2 x 3 debe dar 6', async () => {
        const wrapper = mount(CalculatorCard);

        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");
        const botonPor = wrapper.findAll('button').find(n => n.text() === "x");
        const boton3 = wrapper.findAll('button').find(n => n.text() === "3");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton2.trigger('click');
        await botonPor.trigger('click');
        await boton3.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toContain('6');
    })
    it('6 ÷ 2 debe dar 3', async () => {
        const wrapper = mount(CalculatorCard);

        const boton6 = wrapper.findAll('button').find(n => n.text() === "6");
        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2")
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton6.trigger('click');
        await botonDiv.trigger('click');
        await boton2.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toContain('3');
    })


})