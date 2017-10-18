import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';
import { Operino } from './operino.model';
import { OperinoComponent } from '../operino-component/operino-component.model';
import { OperinoService } from './operino.service';
import { OperinoComponentService } from '../operino-component/operino-component.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-operino-detail',
    templateUrl: './operino-detail.component.html'
})
export class OperinoDetailComponent implements OnInit, OnDestroy {

    operino: Operino;
    private subscription: any;
    authorities: any[];
    isSaving: boolean;
    isEditing: boolean = false;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private operinoService: OperinoService,
        private operinoComponentService: OperinoComponentService,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {
        this.jhiLanguageService.setLocations(['operino', 'operinoComponent', 'hostingType', 'operinoComponentType', 'footer']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.isEditing = this.route.snapshot.data['isEditing'];
    }

    load (id) {
        // disable editing if active
        this.isEditing = false;
        this.operinoService.find(id).subscribe(operino => {
            this.operino = operino;
            this.assignOperinoToComponents();
            // update config
            this.updateConfig(id);
        });
        // this.operinoService.components(id).subscribe(
        //     (res: Response) => this.onSuccess(res.json(), res.headers),
        //     (res: Response) => this.onError(res.json())
        // );
    }

    updateConfig(id) {
        this.operinoService.config(id).subscribe(config => {
            this.operino.config = config;
        });
    }

    updateStatus() {
        this.operino.active = ! this.operino.active;
        this.save();
    }

    save () {
        this.isSaving = true;
        if (this.operino.id !== undefined) {
            this.operinoService.update(this.operino)
                .subscribe((res: Operino) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.operinoService.create(this.operino)
                .subscribe((res: Operino) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Operino) {
          //this.eventManager.broadcast({ name: 'operinoListModification', content: 'OK'});
        this.operino = result;
        // assign operino to components
        this.assignOperinoToComponents();
        // update config
        this.updateConfig(this.operino.id);
        this.isSaving = false;
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private assignOperinoToComponents() {
        // console.log('Operino components', this.operino.components);
        // this.operino.components.forEach(function(component) {
        //     console.log('component', component);
        //     console.log('this.operino', this.operino);
        //     component.operino = this.operino;
        // });
        // this.operino.components = [];
        for (let component of this.operino.components) {
            let copy: Operino = Object.assign({}, this.operino);
            component.operino = copy;
        }
    }
}
