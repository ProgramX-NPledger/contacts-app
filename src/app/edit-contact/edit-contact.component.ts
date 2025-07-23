import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues, addressTypeValues } from '../contacts/contact.model';
import { restrictedFormValidator } from '../validators/restricted-forms-validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contactForm = this.fb.nonNullable.group({
    id: '',
    personal: false,
    firstName: ['',[Validators.required,Validators.minLength(2)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
      favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: ''
    }),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: ['', Validators.required]
    }),
    notes: ['', restrictedFormValidator]
  });

  constructor(private route: ActivatedRoute, 
    private contactsService: ContactsService, 
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(contact => {
      if (contact) {
        this.contactForm.setValue(contact);
      }
    });
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe(() => {
      next: () => this.router.navigate(['/contacts'])
    });
  }

  get firstName() {
    return this.contactForm.controls.firstName
  }
}
