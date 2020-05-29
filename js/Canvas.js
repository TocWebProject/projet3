"use strict";
class Canvas {
    constructor(){
        // Emplacement du canvas et détermination du context 2d
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Tailles du canvas
        this.canvas.width = 270;
        this.canvas.height = 130;
        // Style du tracé pour la signature
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';             
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#2f2f2f';
        // Boolean 
        this.isDrawing = false;
        // Valeur de base de position souris 
        this.lastX = 0;
        this.lastY = 0;
        // Valeur de base de position Touch
        this.lastTouchX = "";
        this.lastTouchY = "";
        // Appel de la methode version desktop
        this.mouseMove();
        // Appel de la methode version mobile et tablette
        this.touchMobile();
    }

    // =======  Canvas version desktop ======= 

    // Création du tracé de la souris
    draw(e) {
        if(!this.isDrawing) return;
        event.preventDefault();
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }

    // Analyse des mouvements souris
    mouseMove(){
        // Récuperation des valeurs x et y lorsque l'utilisateur débute son tracé. 
        this.canvas.addEventListener('mousedown', (e) => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });
        // Appel de la fonction draw lorsque la souris bouge
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.isDrawing = false);
        this.canvas.addEventListener('mouseout', () => this.isDrawing = false);
    }
    
    // =======  Canvas version Mobile & Tablette  ======= 

    // Création du tracé tactile
    drawTouch(e) {
        if(this.isDrawing){
        event.preventDefault();        
        let canvasCss = e.target.getBoundingClientRect();
        this.lastTouchX = e.targetTouches[0].clientX - canvasCss.left;
        this.lastTouchY = e.targetTouches[0].clientY - canvasCss.top;
        this.ctx.lineTo (e.targetTouches[0].clientX - canvasCss.left, e.targetTouches[0].clientY - canvasCss.top);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [e.targetTouches[0].clientX - canvasCss.left, e.targetTouches[0].clientY - canvasCss.top];
        }
    }

    // Analyse des mouvements du doigt.
    touchMobile(){
        // Récuperation des valeurs x et y lorsque l'utilisateur débute son tracé. 
        this.canvas.addEventListener('touchstart', (e) => {
        event.preventDefault();
        this.isDrawing = true;
        this.ctx.beginPath();
        this.touches(e);
        this.ctx.moveTo(this.lastTouchX, this.lastTouchY);
        });
        // Appel de la fonction drawTouch lorsque l'utilisateur déplace son doigt
        this.canvas.addEventListener('touchmove', (e) => this.drawTouch(e));
        this.canvas.addEventListener('touchend', () => this.isDrawing = false);
        this.canvas.addEventListener('touchcancel', () => this.isDrawing = false);
    }

    touches(e) {
        let canvasCss = e.target.getBoundingClientRect();
        this.lastTouchX = e.targetTouches[0].clientX - canvasCss.left;
        this.lastTouchY = e.targetTouches[0].clientY - canvasCss.top;
    }
}


