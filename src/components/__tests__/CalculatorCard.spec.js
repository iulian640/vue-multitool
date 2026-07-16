import { describe, it, expect } from 'vitest';
import { createWrapperError, mount } from '@vue/test-utils';
import CalculatorCard from '../CalculatorCard.vue';

describe('CalculatorCard', () => {
    it('Al montar el display muestra 0', () => {
        const wrapper = mount(CalculatorCard)

        expect(wrapper.find('.calc__display').text()).toBe('0')
    })

    it('Pulsar 5 muestra 5', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === '5');

        await boton5.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('5');
    })

    it('Pulsar 1 y 2 deja 12', async () => {
        const wrapper = mount(CalculatorCard);

        const boton1 = wrapper.findAll('button').find(n => n.text() === "1");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");

        await boton1.trigger('click');
        await boton2.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('12');
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

        expect(wrapper.find('.calc__display').text()).toBe('8')
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

        expect(wrapper.find('.calc__display').text()).toBe('2')

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

        expect(wrapper.find('.calc__display').text()).toBe('6');
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

        expect(wrapper.find('.calc__display').text()).toBe('3');
    })

    it('Si pulsas "6" "," y "2" debe dar 6,2', async () => {
        const wrapper = mount(CalculatorCard);

        const boton6 = wrapper.findAll('button').find(n => n.text() === "6");
        const botonComa = wrapper.findAll('button').find(n => n.text() === ",");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");

        await boton6.trigger('click');
        await botonComa.trigger('click');
        await boton2.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('6,2')
    })

    it('No permite poner mas de una coma en un numero', async () => {
        const wrapper = mount(CalculatorCard);

        const boton6 = wrapper.findAll('button').find(n => n.text() === "6");
        const botonComa = wrapper.findAll('button').find(n => n.text() === ",");
        const boton1 = wrapper.findAll('button').find(n => n.text() === "1");

        await boton6.trigger('click');
        await botonComa.trigger('click');
        await botonComa.trigger('click');
        await boton1.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('6,1')
    })

    it('CE borra el numero actual', async () => {
        const wrapper = mount(CalculatorCard);

        const boton6 = wrapper.findAll('button').find(n => n.text() === "6")
        const botonCE = wrapper.findAll('button').find(n => n.text() === "CE")

        await boton6.trigger('click');
        await botonCE.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('0')
    })

    it('C borra toda la operación', async () => {
        const wrapper = mount(CalculatorCard);

        const boton6 = wrapper.findAll('button').find(n => n.text() === "6");
        const botonMas = wrapper.findAll('button').find(n => n.text() === "+");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");
        const botonC = wrapper.findAll('button').find(n => n.text() === "C")

        await boton6.trigger('click');
        await botonMas.trigger('click');
        await boton2.trigger('click');
        await botonC.trigger('click');

        expect(wrapper.find('.calc__expression').text()).toBe('');
    })

    it('5, +, 3, +, 3, = deben dar 11 con total acumulado', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === "5");
        const botonMas = wrapper.findAll('button').find(n => n.text() === "+");
        const boton3 = wrapper.findAll('button').find(n => n.text() === "3");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=")

        await boton5.trigger('click');
        await botonMas.trigger('click');
        await boton3.trigger('click');
        await botonMas.trigger('click');
        await boton3.trigger('click')
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('11')
    })

    it('5, ÷, 0 da "Sin definir"', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === "5");
        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton0 = wrapper.findAll('button').find(n => n.text() === "0");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton5.trigger('click');
        await botonDiv.trigger('click');
        await boton0.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('Sin definir')

    })

    it('0, ÷, 0 da "Sin definir"', async () => {
        const wrapper = mount(CalculatorCard);

        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton0 = wrapper.findAll('button').find(n => n.text() === "0");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton0.trigger('click');
        await botonDiv.trigger('click');
        await boton0.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('Sin definir')

    })

    it('0, ÷, 0 , =, = da "Sin definir"', async () => {
        const wrapper = mount(CalculatorCard);

        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton0 = wrapper.findAll('button').find(n => n.text() === "0");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton0.trigger('click');
        await botonDiv.trigger('click');
        await boton0.trigger('click');
        await botonEqual.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('Sin definir')

    })

    it('5, ÷, 0, =, pulsar un número teniendo Sin definir bloqueado, solo permite C', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === "5");
        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton0 = wrapper.findAll('button').find(n => n.text() === "0");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");
        const boton7 = wrapper.findAll('button').find(n => n.text() === "7");

        await boton5.trigger('click');
        await botonDiv.trigger('click');
        await boton0.trigger('click');
        await botonEqual.trigger('click');
        await boton7.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('Sin definir');
    })

    it('5, ÷, 0, =, C desbloquea la calculadora y 7 vuelve a escribir', async () => {
        const wrapper = mount(CalculatorCard);

        const boton5 = wrapper.findAll('button').find(n => n.text() === "5");
        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton0 = wrapper.findAll('button').find(n => n.text() === "0");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");
        const botonC = wrapper.findAll('button').find(n => n.text() === "C");
        const boton7 = wrapper.findAll('button').find(n => n.text() === "7");

        await boton5.trigger('click');
        await botonDiv.trigger('click');
        await boton0.trigger('click');
        await botonEqual.trigger('click');
        await botonC.trigger('click');
        await boton7.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('7');
    })

    it('-, 5 hace que el valor sea -5(negativo)', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const botonMenos = wrapper.findAll('button').find(n => n.text () === "-");
        const boton5 = wrapper.findAll('button').find(n => n.text () === "5");

        await botonMenos.trigger('click');
        await boton5.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('-5')
    })

    it('si pulsamos -, -, y = no da NaN', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const botonMenos = wrapper.findAll('button').find(n => n.text () === "-");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await botonMenos.trigger('click');
        await botonMenos.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('-')
    })


    it('123 y backspace deja 12', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const boton1 = wrapper.findAll('button').find(n => n.text () === "1");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");
        const boton3 = wrapper.findAll('button').find(n => n.text () === "3");
        const botonBorrar = wrapper.findAll('button').find(n => n.text() === "⌫");
        
        await boton1.trigger('click');
        await boton2.trigger('click');
        await boton3.trigger('click');
        await botonBorrar.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('12')
    })

    it('1 y ⌫ nos deja en 0', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const boton1 = wrapper.findAll('button').find(n => n.text () === "1");
        const botonBorrar = wrapper.findAll('button').find(n => n.text() === "⌫");
        
        await boton1.trigger('click');
        await botonBorrar.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('0')
    })

    it('- y ⌫ nos deja en 0', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const botonMenos = wrapper.findAll('button').find(n => n.text () === "-");
        const botonBorrar = wrapper.findAll('button').find(n => n.text() === "⌫");
        
        await botonMenos.trigger('click');
        await botonBorrar.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('0')
    })

    it('Muestra 10 dígitos como máximo', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const boton1 = wrapper.findAll('button').find(n => n.text () === "1");
        const boton2 = wrapper.findAll('button').find(n => n.text() === "2");
        const boton3 = wrapper.findAll('button').find(n => n.text () === "3");
        const boton4 = wrapper.findAll('button').find(n => n.text() === "4");
        const boton5 = wrapper.findAll('button').find(n => n.text () === "5");
        const boton6 = wrapper.findAll('button').find(n => n.text() === "6");
        const boton7 = wrapper.findAll('button').find(n => n.text () === "7");
        const boton8 = wrapper.findAll('button').find(n => n.text() === "8");
        const boton9 = wrapper.findAll('button').find(n => n.text () === "9");
        const boton0 = wrapper.findAll('button').find(n => n.text() === "0");
        

        await boton1.trigger('click');
        await boton2.trigger('click');
        await boton3.trigger('click');
        await boton4.trigger('click');
        await boton5.trigger('click');
        await boton6.trigger('click');
        await boton7.trigger('click');
        await boton8.trigger('click');
        await boton9.trigger('click');
        await boton0.trigger('click');
        await boton0.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('1234567890')
    })

    it('1, ÷, 3, =, 0,33333333 (8 decimales)', async () => {
        const wrapper = mount(CalculatorCard);

        const boton1 = wrapper.findAll('button').find(n => n.text() === "1");
        const botonDiv = wrapper.findAll('button').find(n => n.text() === "÷");
        const boton3 = wrapper.findAll('button').find(n => n.text() === "3");
        const botonEqual = wrapper.findAll('button').find(n => n.text() === "=");

        await boton1.trigger('click');
        await botonDiv.trigger('click');
        await boton3.trigger('click');
        await botonEqual.trigger('click');

        expect(wrapper.find('.calc__display').text()).toBe('0,33333333');
    })

    it('pulsar la tecla física 5 y recibir 5', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '5'}));
        await wrapper.vm.$nextTick();
        
        expect(wrapper.find('.calc__display').text()).toBe('5');
    })

    it('teclas fisicas 2, *, 3 y enter dan 6', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '2'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '*'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '3'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter'}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__display').text()).toBe('6');
    })

    it('"enter" y display sigue en 0', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter'}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__display').text()).toBe('0');
    })

})