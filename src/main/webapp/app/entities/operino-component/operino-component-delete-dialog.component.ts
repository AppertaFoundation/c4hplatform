import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { OperinoComponent } from './operino-component.model';
import { OperinoComponentPopupService } from './operino-component-popup.service';
import { OperinoComponentService } from './operino-component.service';

@Component({
    selector: 'jhi-operino-component-delete-dialog',
    templateUrl: './operino-component-delete-dialog.component.html'
})
export class OperinoComponentDeleteDialogComponent {

    operinoComponent: OperinoComponent;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private operinoComponentService: OperinoComponentService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['operinoComponent', 'hostingType', 'operinoComponentType', 'operino', 'footer']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (component: OperinoComponent) {

        console.log('Component : ', component);
        console.log('Operino : ', component.operino);
        this.operinoComponentService.delete(component.id, component.operino.id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'operinoComponentDeleted',
                content: component
            });
            this.activeModal.dismiss(true);
        });

        //this.operinoComponentService.delete(id, this.operinoComponent.operino.id).subscribe(response => {
        //    this.eventManager.broadcast({
        //        name: 'operinoComponentListModification',
        //        content: 'Deleted an operinoComponent'
        //    });
        //    this.activeModal.dismiss(true);
        //});
    }
}

@Component({
    selector: 'jhi-operino-component-delete-popup',
    template: ''
})
export class OperinoComponentDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private operinoComponentPopupService: OperinoComponentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.operinoComponentPopupService
                .open(OperinoComponentDeleteDialogComponent, params['id'], params['operinoId'], false);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
