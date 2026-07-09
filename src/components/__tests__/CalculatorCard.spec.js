import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CalculatorCard from '../CalculatorCard.vue';

describe('CalculatorCard', () => {
    it('Al montar el display muestra 0', () => {
        const wrapper = mount(CalculatorCard)
        
        expect(wrapper.text()).toContain('0')
    })

    it('Pulsar 5 muestra 5', async () => {
        const wrapper = mount(CalculatorCard);
        
        const boton5 = wrapper.findAll('button').find(n => n.text() === '5');
        
        await boton5.trigger('click');
        
        expect(wrapper.text()).toContain('5');
    })

    it('Pulsar 1 y 2 deja 12', async () => {
        const wrapper = mount(CalculatorCard) ;
        
        const boton1 = wrapper.findAll('button').find(n => n.text() === "1");
        const boton2 = wrapper.findAll('button').find(n => n.text() ==="2");

        await boton1.trigger('click');
        await boton2.trigger('click');

        expect(wrapper.text()).toContain('12');
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

        expect(wrapper.text()).toContain('8')
    })


})