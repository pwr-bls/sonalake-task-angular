import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { CharacterActions } from '../../../store/actions/characters.action';
import { CharacterModel } from '../../../store/model/character.model';
import { SpeciesActions } from '../../../store/actions/species.action';
import { getSpeciesList } from '../../../store/selectors/species-state.selector';
import { IFieldBase } from '../../../store/model/field-base.interface';
import { ActivatedRoute } from '@angular/router';
import { getCharacterSelected } from '../../../store/selectors/charcter-state.selector';

@Component({
  selector: 'sl-live-view-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class LiveViewEditItemComponent implements OnInit, OnDestroy {
  public showErrors: boolean = false;
  public formField: FormGroup;
  public species$: Observable<string[]>;

  private fields: IFieldBase[] = <IFieldBase[]>[
    { key: 'name', label: 'Name', required: true, controlType: 'textfield' },
    { key: 'species', label: 'Species', required: true, controlType: 'dropdown', options: [] },
    {
      key: 'gender', label: 'Gender', required: true, controlType: 'radiobutton',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'n/a', label: 'n/a' }]
    },
    { key: 'homeworld', label: 'Homeworld', controlType: 'textfield' },
  ];

  private validation = {};
  private subscription: Subscription = new Subscription();
  private routeParams = null;


  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private actions: CharacterActions,
    private speciesActions: SpeciesActions,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.initSubscibers();
    this.route.params.take(1).subscribe((params) => {
      this.routeParams = params;
      if (params.id) {
        this.store.dispatch(this.actions.select.init(params.id))
      }
      this.store.dispatch(this.speciesActions.load.init());
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public handleSubmitForm({ value, valid }: { value: CharacterModel, valid: boolean }) {
    this.showErrors = false;
    if (!this.formField.valid) {
      this.showErrors = true;
      return;
    }
    this.store.dispatch(this.actions.save.init(value));
  }

  public checkField(fieldName: string) {
    this.validation[fieldName] = ![
      this.showErrors && this.isRequired(fieldName),
      this.isRequired(fieldName) && this.formField.get(fieldName).touched
    ].some((value) => value === true);
  }

  public isRequired(fieldName: string): boolean {
    return this.formField.get(fieldName).hasError('required');
  }

  private createForm() {
    const obj = {};
    this.fields.forEach((field: IFieldBase) => {
      const validators = [];
      this.validation[field.key] = true;
      if (field.required) {
        validators.push(Validators.required);
      }
      obj[field.key] = [field.value || '', [...validators]]
    });
    this.formField = this.fb.group(obj);
  }

  private initSubscibers() {
    this.subscribeOnSpeciesList();
    this.subscribeOnCharacterData();
  }

  private subscribeOnSpeciesList() {
    this.subscription.add(this.store.select(getSpeciesList).subscribe((species: string[]) => {
      this.fields[1] = { ...this.fields[1], options: species };
    }));
  }

  private subscribeOnCharacterData() {
    this.store.select(getCharacterSelected)
      .subscribe((data: CharacterModel) => {
        console.log(data);
        this.formField.patchValue(data)
      });
  }
}
